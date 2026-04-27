export interface ComponentDefinition {
  type: string;
  label: string;
  category: 'infrastructure' | 'ai';
  iconName: string;
  description: string;
  baseCapacity: number;
  baseLatency: number;
}

export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  // Infrastructure
  {
    type: 'loadBalancer',
    label: 'Load Balancer',
    category: 'infrastructure',
    iconName: 'ArrowLeftRight',
    description: 'Distributes traffic across servers',
    baseCapacity: 10000,
    baseLatency: 5,
  },
  {
    type: 'apiGateway',
    label: 'API Gateway',
    category: 'infrastructure',
    iconName: 'Network',
    description: 'Entry point for all clients',
    baseCapacity: 5000,
    baseLatency: 10,
  },
  {
    type: 'webServer',
    label: 'Web Server',
    category: 'infrastructure',
    iconName: 'Server',
    description: 'Handles HTTP requests',
    baseCapacity: 2000,
    baseLatency: 50,
  },
  {
    type: 'sqlDb',
    label: 'SQL Database',
    category: 'infrastructure',
    iconName: 'Database',
    description: 'Relational data storage',
    baseCapacity: 1000,
    baseLatency: 20,
  },
  {
    type: 'noSqlDb',
    label: 'NoSQL Database',
    category: 'infrastructure',
    iconName: 'Table',
    description: 'Flexible document storage',
    baseCapacity: 3000,
    baseLatency: 10,
  },
  {
    type: 'cache',
    label: 'Redis Cache',
    category: 'infrastructure',
    iconName: 'Zap',
    description: 'In-memory fast storage',
    baseCapacity: 20000,
    baseLatency: 1,
  },
  {
    type: 'cdn',
    label: 'CDN',
    category: 'infrastructure',
    iconName: 'Globe',
    description: 'Edge content delivery',
    baseCapacity: 50000,
    baseLatency: 2,
  },
  {
    type: 'messageQueue',
    label: 'Message Queue',
    category: 'infrastructure',
    iconName: 'Layers',
    description: 'Async communication',
    baseCapacity: 5000,
    baseLatency: 15,
  },
  // AI/ML
  {
    type: 'llmModel',
    label: 'LLM Model',
    category: 'ai',
    iconName: 'Brain',
    description: 'Large Language Model',
    baseCapacity: 50,
    baseLatency: 500,
  },
  {
    type: 'inferenceServer',
    label: 'Inference Server',
    category: 'ai',
    iconName: 'Cpu',
    description: 'AI model hosting',
    baseCapacity: 200,
    baseLatency: 100,
  },
  {
    type: 'vectorDb',
    label: 'Vector DB',
    category: 'ai',
    iconName: 'Search',
    description: 'Embedding storage',
    baseCapacity: 1000,
    baseLatency: 30,
  },
  {
    type: 'dataPipeline',
    label: 'Data Pipeline',
    category: 'ai',
    iconName: 'GitBranch',
    description: 'ETL processing',
    baseCapacity: 1000,
    baseLatency: 1000,
  },
  {
    type: 'featureStore',
    label: 'Feature Store',
    category: 'ai',
    iconName: 'HardDrive',
    description: 'ML features repository',
    baseCapacity: 5000,
    baseLatency: 10,
  },
  {
    type: 'trainingCluster',
    label: 'Training Cluster',
    category: 'ai',
    iconName: 'Activity',
    description: 'GPU training nodes',
    baseCapacity: 10,
    baseLatency: 10000,
  },
];

export const ICON_MAP: Record<string, string> = {
  'ArrowLeftRight': 'ArrowLeftRight',
  'Network': 'Network',
  'Server': 'Server',
  'Database': 'Database',
  'Table': 'Table',
  'Zap': 'Zap',
  'Globe': 'Globe',
  'Layers': 'Layers',
  'Brain': 'Brain',
  'Cpu': 'Cpu',
  'Search': 'Search',
  'GitBranch': 'GitBranch',
  'HardDrive': 'HardDrive',
  'Activity': 'Activity',
};
