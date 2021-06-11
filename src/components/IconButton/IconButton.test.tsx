import React from 'react';
import { render } from '@testing-library/react';

import { IconButton } from '.';
import { Plus as PlusIcon } from '../Icons';

describe('IconButton', () => {
  test('render an icon inside the button', () => {
    const { getByTitle } = render(
      <IconButton>
        <PlusIcon />
      </IconButton>,
    );

    expect(getByTitle('plus icon')).toBeInTheDocument();
  });
});
