import styled from 'styled-components'
import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

    html, body, div, span, label, input,h1, h2, h3, h4, h5, h6, p, a, img, ol, ul, li, fieldset, form, label, legend, article,figure, figcaption, footer, header,nav, section, textarea {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: none;
        text-decoration: none;
        font-size: 14px;
        ol, ul {list-style:none};

        color: #333;
    }

    body {
        width: 100%;
        height: 100%;
    }

    button {
        border: none;
        background: transparent;
    }
`;

export const Flex = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const cursor = css`
	cursor: pointer;
`;

export const Layout = css`
	min-width: 1280px;
    max-width : 1920px;
	margin: 0 auto;
`;

export const Grid = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

/* About Div styled ---------------------------------------------- */
const FlexBox = styled.div`
	${Flex}
`;
const LayoutBox = styled.div`
	${Layout}
`;

export { FlexBox, LayoutBox };
