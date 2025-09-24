import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Generate random numbers',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generateRandomNumber',
					},
				],
				default: 'generateRandomNumber',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Minimum value',
				displayOptions: {
					show: {
						operation: ['generateRandomNumber'],
					},
				},
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				description: 'Maximum value',
				displayOptions: {
					show: {
						operation: ['generateRandomNumber'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			// Pega os valores de min e max que o usuário configurou
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			try {

				const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

				// Faz a requisição para a API do Random.org
				const response = await this.helpers.request({
					method: 'GET',
					url: url,
					json: false,
				});

				const randomNumber = parseInt(response.trim(), 10);

				returnData.push({
					json: {
						randomNumber,
						min,
						max,
						source: 'Random.org API',
					},
				});
			} catch {
				// Se a API falhar, usa geração local como fallback
				const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

				returnData.push({
					json: {
						randomNumber,
						min,
						max,
						source: 'Local fallback',
						error: 'Random.org API unavailable',
					},
				});
			}
		}

		return [returnData];
	}
}