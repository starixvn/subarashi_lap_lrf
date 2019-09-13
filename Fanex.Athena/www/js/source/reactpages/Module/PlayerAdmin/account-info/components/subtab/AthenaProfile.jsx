import React from 'react';
import ClientResourceManager from '@jsroot/lib/clientResourceManager';

export const AthenaProfile = ({ data }) => {
    const { AGUserId, GoldDeluxeUserId, VoidbridgeUserId, ExchangeUserId,
        FirstName, LastName, Gender, Birthday, Phone, Country, Address, City, Town, State, ZipCode,
        SecurityQuestion, SecurityCode, HowToKnow, PreferredUserName, PreferredCurrency, PreferredOdds, PreferredLanguage } = data || {};

    return (
        <tbody>
            <tr>
                <td className="first-cell">{ClientResourceManager.getText('AgUserId')}</td>
                <td>{AGUserId}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('GoldDeluxeUserId')}</td>
                <td>{GoldDeluxeUserId}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('VoidBridgeUserId')}</td>
                <td>{VoidbridgeUserId}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('ExchangeUserId')}</td>
                <td>{ExchangeUserId}</td>
            </tr>
            <tr>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>First name</td>
                <td>{FirstName}</td>
            </tr>
            <tr>
                <td>Last name</td>
                <td>{LastName}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('Gender')}</td>
                <td>{Gender}</td>
            </tr>
            <tr>
                <td>Date of birth</td>
                <td>{Birthday}</td>
            </tr>
            <tr>
                <td>Mobile</td>
                <td>{Phone}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('Country')}</td>
                <td>{Country}</td>
            </tr>
            <tr>
                <td>{ClientResourceManager.getText('Address')}</td>
                <td>{Address}</td>
            </tr>
            <tr>
                <td>City/ Town</td>
                <td>{City}{City && Town && '/'}{Town}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>{State}</td>
            </tr>
            <tr>
                <td>Zip Code</td>
                <td>{ZipCode}</td>
            </tr>
            <tr>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>Security question</td>
                <td>{SecurityQuestion}</td>
            </tr>
            <tr>
                <td>Security code</td>
                <td>{SecurityCode}</td>
            </tr>
            <tr>
                <td>Where did you hear about us</td>
                <td>{HowToKnow}</td>
            </tr>
            <tr>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>My preferred username</td>
                <td>{PreferredUserName}</td>
            </tr>
            <tr>
                <td>My preferred currency</td>
                <td>{PreferredCurrency}</td>
            </tr>
            <tr>
                <td>My preferred odds</td>
                <td>{PreferredOdds}</td>
            </tr>
            <tr>
                <td>My preferred language</td>
                <td>{PreferredLanguage}</td>
            </tr>
        </tbody>
    );
}

export default AthenaProfile;