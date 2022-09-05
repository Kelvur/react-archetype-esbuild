// Core
import React from 'react';
import { render } from '@testing-library/react';
// Local Components
import List from './List';


describe('List component', () => {

    it('should render correctly', () => {
        render(
            <List
                value={[
                    {name: 'One', value: 'one'},
                    {name: 'Two', value: 'two'},
                ]}
            />
        );
    });

});
