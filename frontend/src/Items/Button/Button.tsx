interface BtnProps {
    img: string,
    text: string
}

const Button = ({ img, text }: BtnProps) => {
    return (
        <button className="button">
            <img src={img} />{text}
        </button>
    );
}
 
export default Button;
