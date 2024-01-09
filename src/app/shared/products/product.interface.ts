export interface IProduct {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: string;
    name: string;
    price: number;
    images: Array<{
        source: string;
        url: string;
    }>;
    subCategory: string;
    feedbacksCount: number;
    rating: number;
}
