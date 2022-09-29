import React, { Fragment, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';
import { CustomersDrawer } from './CustomersDrawer';
import { ICustomer } from '../dto/Customers';

export const Customers = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [customerForUpdate, setCustomerForUpdate] = useState<ICustomer | null>(null);

  return (
    <Fragment>
      <ComponentHeader title={'Абоненты'} callback={() => setVisibleDrawer(true)} />
      <CustomersDrawer visible={visibleDrawer} setVisible={setVisibleDrawer} customerForUpdate={customerForUpdate} />
    </Fragment>
  );
};
