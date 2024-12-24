import { Link } from 'react-router-dom';

const QuickLinks = () => {
    const links = [
        { to: "/", text: "Home" },
        { to: "/contact", text: "Contact Us" },
        { to: "/profile/cart", text: "Cart" },
        { to: "/login", text: "Login" },
        { to: "/register", text: "Register" }
    ];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="text-center">
                {links.map((link) => (
                    <li key={link.to} className="mb-2">
                        <Link to={link.to} className="hover:underline">
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickLinks;