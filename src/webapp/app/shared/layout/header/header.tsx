import React, { useState, useEffect } from 'react';
import { Translate, Storage } from 'react-jhipster';

import { isRTL } from 'app/config/translation';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';

export interface IHeaderProps {
    currentLocale: string;
}

const Header = (props: IHeaderProps) => {

    useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));

    const dispatch = useAppDispatch();

    const handleLocaleChange = event => {
        const sessionLocale = Storage.session.get('locale');
        const langKey = sessionLocale === 'en' || typeof sessionLocale === 'undefined' ? 'ar' : 'en';
        Storage.session.set('locale', langKey);
        dispatch(setLocale(langKey));
        document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
    };


    return (
        <>
            <div className='lang' onClick={handleLocaleChange}>
                {props.currentLocale}
            </div>
        </>
    );
};

export default Header;
