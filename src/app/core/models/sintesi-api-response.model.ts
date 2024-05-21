export interface SintesiApiResponse<T = any> {
    data?: T;
    count: number;
    httpstatus: {
        code: number;
        description: string;
        custom_description?: string;
    };
}
