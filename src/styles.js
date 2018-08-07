import styled from 'styled-components';
import {
  Search,
} from 'styled-icons/fa-solid';

export const Wrapper = styled.div`
    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px; 
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const Input = styled.input`
    margin: 0;
    color: rgba(0,0,0,.5);
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 10px 10px 10px 40px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    width: 100%;

    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
`;

export const InputWrapper = styled.div`
    position: relative;
`;

export const SearchIcon = styled(Search)`
    position: absolute;
    width: 15px;
    height: 15px;
    
    left: 10px;
    top: 12px;
`;

export const ResultList = styled.ul`
    background-color: #fff;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 1000;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Result = styled.li`
    border: 1px solid rgba(0,0,0,0.1);

    &:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

export const ResultLink = styled.button`
    text-align: left;
    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: none;
    border: none;
    outline: inherit;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #404040;
    cursor: pointer;

    &:active {
        color: #202020;
        background-color: #eee;
        text-decoration: none;
        cursor: pointer;
    }
`;
