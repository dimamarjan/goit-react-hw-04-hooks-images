import { GalleryListItem, GalleryListItemimage } from './ImageGalleryItem.style'

export function ImageGalleryItem({data, currentImageHeandler}) {
    const showImages = (e) => {
        e.target.style.opacity = 1;
    };

    const getTargetImg = ({ target }) => {
        data.forEach(image => {
            if (image.id === parseInt(target.id)) {
                currentImageHeandler(image);
            }
        });
    };

    return (
        <>
            {data.map(galleryElement => (
                <GalleryListItem key={galleryElement.id}>
                    <GalleryListItemimage
                        id={galleryElement.id}
                        src={galleryElement.webformatURL}
                        alt={galleryElement.tags}
                        onLoad={showImages}
                        onClick={getTargetImg}
                    />
                </GalleryListItem>
            ))}
        </>
    );
}
