import { Alert } from "./Alert";
import { Footer } from "./Footer";
import { Meta } from "./Meta";

type Props = {
    preview?: boolean;
    children: React.ReactNode;
};

export const Layout = ({ preview, children }: Props) => {
    return (
        <>
            <Meta />
            <div className="min-h-screen">
                <Alert preview={preview} />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
};
