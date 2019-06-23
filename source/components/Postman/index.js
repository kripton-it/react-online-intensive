import React from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from './../../HOC/with-profile';

const Postman = ({ avatar, currentUserFirstName }) => {
    const { postman } = Styles;

    return (
        <section className = { postman }>
            <img
                alt = 'Avatar'
                src = { avatar }
            />
            <span>Welcome online, { currentUserFirstName }</span>
        </section>
    );
}

export default withProfile(Postman);
