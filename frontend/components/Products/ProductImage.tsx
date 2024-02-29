import { useNavigate } from 'react-router-dom';

type CardProps = {
    id: number;
    title: string;
    imageSource: string;
    text: string;
    price: number;
};

function ProductImage(props: CardProps) {

    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/products/${props.id}`);
    };

    return (
        <img onClick={handleImageClick} src={props.imageSource} alt='name' width={200} height={200} />
    );
}

export default ProductImage;
