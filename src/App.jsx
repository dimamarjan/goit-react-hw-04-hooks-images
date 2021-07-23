import { useEffect, useState, useCallback } from 'react'

import { Searchbar } from 'components/Searchbar/Searchbar'
import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { Loader } from 'components/Loader/Loader'
import { ToastNotify } from 'utils/ToastNotify'
import { Spinner } from 'components/SkeletonComponent/Spinner'
import { ModalWindow } from 'components/ModalWindow/ModalWindow'

import { getData } from 'utils/getData'
	

function App() {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const [findInputData, setFindInputData] = useState("");
	const [page, setPage] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [currentImg, setCurrentImg] = useState(null);
	
	const [showGallery, setShowGallery] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [showNoDataFound, setShowNoDataFound] = useState(false);
	const [showButtonLoadMore, setShowButtonLoadMore] = useState(false);
	

	const loadMoreHandle = () => {
		setPage(prevState => prevState + 1);
	};
	
	
	const getResponseHandler = (imageName) => {
		setPage(1);
		setStatus("pending");
		setFindInputData(imageName);
		getData(imageName).then(resp => {
			if (resp.length === 0) {
				setStatus("rejected");
				return;
			} else {
				setData(resp);
				setStatus("resolved");
			};
		});
	};


	const currentImageHeandler = (targetImage) => {
		setCurrentImg(targetImage);
	};


	const closeModal = useCallback((eve) => {
		const mouseTarget = eve.target.classList[0];
		const {key} = eve;
		if (mouseTarget === "backdrop" || key === "Escape") {
			setShowModal(false);
			setCurrentImg(null);
			window.removeEventListener("keydown", closeModal)
		};
	}, []);



	useEffect(() => {
		if (page !== 1) {
			getData(findInputData, page).then(resp => {
				if (resp.length === 0) {
					setStatus("rejected")
					return;
				} else {
					setData(prevState => [...prevState, ...resp]);
					setStatus("resolved");
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'smooth',
					});
				};
			});
		};
		
	}, [findInputData, page]);


	useEffect(() => {
		if(currentImg !== null){
			setShowModal(true);
			window.addEventListener("keydown", closeModal);
		};
	}, [currentImg, closeModal]);


	useEffect(() => {
		switch (status) {
			case "resolved":
				setShowNoDataFound(false);
				setShowSpinner(false);
				setShowGallery(true);
				setShowButtonLoadMore(true);
				break;
			case "pending":
				setShowNoDataFound(false);
				setShowGallery(false);
				setShowButtonLoadMore(false);
				setShowSpinner(true);
				break;
			case "rejected":
				setShowGallery(false);
				setShowSpinner(false);
				setShowButtonLoadMore(false);
				setShowNoDataFound(true);
				break;
			default:
				break;
		}
	}, [status]);



	return (
		<div className="App">
			<Searchbar onSubmit={getResponseHandler} />
			{showSpinner && <Spinner />}
			{showGallery && <ImageGallery >
				<ImageGalleryItem
					data={data}
					currentImageHeandler={currentImageHeandler}
				/>
			</ImageGallery>}
			{showNoDataFound && <ToastNotify />}
			{showButtonLoadMore && <Loader onLoadData={loadMoreHandle} />}
			{showModal && <ModalWindow
				currentImage={currentImg}
				onCloseModal={closeModal}
			/>}
		</div>
	);
};



export default App
