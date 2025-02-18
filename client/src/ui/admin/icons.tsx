import { IconProps } from "@/types/icon";

export const FilterIcon = ({ width, height, fill, className }: IconProps) => {
    return (
        <svg
            width={width ?? "24"}
            height={height ?? "21"}
            viewBox="0 0 24 21"
            fill={fill ?? "none"}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M9.61865 16.9701H1.31494"
                stroke="black"
                strokeWidth="1.97685"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3228 4.19564H21.6265"
                stroke="black"
                strokeWidth="1.97685"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50513 4.12484C7.50513 2.4173 6.11059 1.03271 4.39075 1.03271C2.67092 1.03271 1.27637 2.4173 1.27637 4.12484C1.27637 5.83238 2.67092 7.21696 4.39075 7.21696C6.11059 7.21696 7.50513 5.83238 7.50513 4.12484Z"
                stroke="black"
                strokeWidth="1.97685"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.363 16.9183C22.363 15.2108 20.9696 13.8262 19.2497 13.8262C17.5288 13.8262 16.1343 15.2108 16.1343 16.9183C16.1343 18.6258 17.5288 20.0104 19.2497 20.0104C20.9696 20.0104 22.363 18.6258 22.363 16.9183Z"
                stroke="black"
                strokeWidth="1.97685"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
