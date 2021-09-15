import styled from 'styled-components';

export const ShirtConfigurator = styled.div`
    height: 100%;
    position: relative;
    position:static;
    z-index: 2;
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        z-index: -99;
    }
`;
