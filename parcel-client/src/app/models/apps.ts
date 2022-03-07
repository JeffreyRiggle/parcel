export interface AppMetaData {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
}

export interface AppsResult {
    results: AppMetaData[];
}
