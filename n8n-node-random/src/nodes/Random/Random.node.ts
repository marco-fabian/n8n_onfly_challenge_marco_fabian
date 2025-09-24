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
			returnData.push({
				json: {
					randomNumber: 42,
				},
			});
		}

		return [returnData];
	}
}