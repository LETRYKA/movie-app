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
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    imdb_id: string;
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
    revenue: number;
    runtime: number;
    spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    // TV Series-specific fields
    created_by: Array<{
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path?: string;
    }>;
    episode_run_time: number[];
    first_air_date: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number;
        season_number: number;
        still_path: string;
    };
    networks: Array<{
        id: number;
        logo_path?: string;
        name: string;
        origin_country: string;
    }>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_name: string;
    seasons: Array<{
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path?: string;
        season_number: number;
        vote_average: number;
        vote_count: number;
    }>;
    type: string;
};
