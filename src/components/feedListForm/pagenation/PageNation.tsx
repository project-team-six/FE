import * as S from "./style";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

const PageNation = ({
	totalPages,
	currentPage,
	setCurrentPage,
}: {
	totalPages: number;
	currentPage: number;
	setCurrentPage: (newPage: number) => void;
}) => {
	return (
		<S.PageNationSection>
			<MdArrowBackIos
				style={
					currentPage > 0 ? { color: "black", cursor: "pointer" } : { color: "#a7a7a7", cursor: "default" }
				}
				onClick={() => {
					if (currentPage > 0) {
						setCurrentPage(currentPage - 1);
					}
				}}
			/>
			{Array.from({ length: totalPages }, (_, index: number) => (
				<button
					key={index}
					className={currentPage === index ? "active" : ""}
					onClick={() => setCurrentPage(index)}>
					{index + 1}
				</button>
			))}
			<MdArrowForwardIos
				style={
					currentPage < totalPages - 1
						? { color: "black", cursor: "pointer" }
						: { color: "#a7a7a7", cursor: "default" }
				}
				onClick={() => {
					if (currentPage < totalPages - 1) {
						setCurrentPage(currentPage + 1);
					}
				}}
			/>
		</S.PageNationSection>
	);
};

export default PageNation;
