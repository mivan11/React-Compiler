import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Promjenjiv from './Promjenjiv';

describe('Komponenta <Promjenjiv />', () => {
    let komponenta;

    beforeEach(() => {
        komponenta = render(
            <Promjenjiv natpis='prikazi...'>
                <div className='testDiv' />
            </Promjenjiv>
        );
    });

    test('renderiranje djece', () => {
        expect(komponenta.container
            .querySelector('.testDiv'))
            .toBeDefined();
    });
 
    /*test('skriva se element nakon klika na sakrij', () => {
        const button = komponenta.getByText('prikazi...');
        fireEvent.click(button);
        const odustani = komponenta.getByText('Sakrij');
        fireEvent.click(odustani);
        
        const div = komponenta.container 
            .querySelector('.promjenjiviSadrzaj');
        expect(div).toHaveStyle('display: none');
    });*/

}); 