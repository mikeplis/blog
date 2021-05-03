import { DateFormatter } from "./DateFormatter";
import { PostTitle } from "./PostTitle";

type Props = {
    title: string;
    date: string;
};

export const PostHeader = ({ title, date }: Props) => {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    );
};
