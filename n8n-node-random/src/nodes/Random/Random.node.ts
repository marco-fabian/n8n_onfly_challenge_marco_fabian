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
		subtitle: 'Números aleatórios',
		description: 'Gera números aleatórios usando Random.org (com fallback local)',
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
				description: 'Valor mínimo para o número aleatório. Pode ser negativo (ex: -100)',
				placeholder: '1',
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
				description: 'Valor máximo para o número aleatório. Deve ser maior que o mínimo (ex: 1000)',
				placeholder: '100',
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

			// Verificar limites da API Random.org
			const RANDOM_ORG_MIN = -1000000000;
			const RANDOM_ORG_MAX = 1000000000;

			if (min < RANDOM_ORG_MIN || min > RANDOM_ORG_MAX || max < RANDOM_ORG_MIN || max > RANDOM_ORG_MAX) {
				returnData.push({
					json: {
						error: 'Valores fora dos limites da Random.org',
						message: `Min e Max devem estar entre ${RANDOM_ORG_MIN.toLocaleString()} e ${RANDOM_ORG_MAX.toLocaleString()}`,
						providedMin: min,
						providedMax: max,
						validRange: `${RANDOM_ORG_MIN.toLocaleString()} a ${RANDOM_ORG_MAX.toLocaleString()}`,
						source: 'Validation Error',
					},
				});
				continue;
			}

			if (min >= max) {
				returnData.push({
					json: {
						error: 'Valores inválidos',
						message: 'O valor mínimo deve ser menor que o máximo',
						providedMin: min,
						providedMax: max,
						source: 'Validation Error',
					},
				});
				continue;
			}

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