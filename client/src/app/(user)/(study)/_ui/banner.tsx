import { Flex } from "antd";
import { twJoin } from "tailwind-merge";

const Banner = ({
    children,
    className = "",
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) => {
    return (
        <Flex
            align="center"
            justify="center"
            style={{
                background:
                    "linear-gradient(247deg,#BAEEF1 0.85%,#EFDBEE 89.91%)",
                boxShadow: "0px 4px 154px 0px rgba(44, 21, 73, 0.25)",
            }}
            className={twJoin("mx-auto p-8", className)}
        >
            {children}
        </Flex>
    );
};

export default Banner;
