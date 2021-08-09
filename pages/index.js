/** @format */
import Link from 'next/link';
function HomePage() {
    return (
        <div>
            <h1>Welcome to Next.js Feedback Demo!</h1>
            <Link href="/static">Static Feedback</Link>
            <Link href="/dynamic">Dynamic Feedback</Link>
        </div>
    );
}

export default HomePage;
