export type MovieDetailType = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number;
    credits: {
        cast: Array<{ id: number; name: string; character: string; profile_path?: string }>;
        crew: Array<{ id: number; name: string; job: string; profile_path?: string }>;
    };
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    images: {
        backdrops: Array<{ file_path: string }>;
        logos: Array<{ file_path: string }>;
        posters: Array<{ file_path: string }>;
    };
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<{
        id: number;
        logo_path?: string;
        name: string;
        origin_country: string;
    }>;
    production_countries: Array<{ iso_3166_1: string; name: string }>;
    release_date: string;
    release_dates: {
        results: Array<{
            iso_3166_1: string;
            release_dates: Array<{
                certification?: string;
                descriptors?: string[];
                iso_639_1?: string;
                note?: string;
                release_date: string;
                type: number;
            }>;
        }>;
    };
    revenue: number;
    runtime: number;
    spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    videos: {
        results: Array<{
            id: string;
            iso_639_1: string;
            iso_3166_1: string;
            key: string;
            name: string;
            official: boolean;
            published_at: string;
            site: string;
            size: number;
            type: string;
        }>;
    };
};
