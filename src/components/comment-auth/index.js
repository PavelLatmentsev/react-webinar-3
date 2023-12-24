import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';


function CommentAuth(props) {
    const cn = bem('CommentAuth');
    return (
        <>
            {
                <div className={cn()}>
                    <Link to={'/login'} state={{ back: props.location.pathname }} className={cn("link")} >{props.link}</Link>,  <span className={cn("title")}> {props.title}</span>

                    {props.current && <button className={cn("btn")} onClick={props.onCloseCancel}>{props.btn}</button>}
                </div>
            }
        </>
    )
}

CommentAuth.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    btn: PropTypes.string,
    current: PropTypes.bool,
}

CommentAuth.defaultProps = {
    onChange: () => {
    },
    type: 'text',
    theme: ''
}

export default memo(CommentAuth);
