import React, { Fragment, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';

export const Categories = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  return (
    <Fragment>
      <ComponentHeader title={'Категории'} callback={() => setVisibleDrawer(true)} />
    </Fragment>
  );
};
