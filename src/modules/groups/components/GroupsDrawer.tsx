import React, { FC } from 'react';
import { IGroup } from '../../customers/dto/Customers';
import { Drawer, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DrawerFooter } from '../../../common/components/DrawerFooter';
import { useAppDispatch } from '../../../hooks/redux';
import { addNewGroup } from '../groupsAsyncActions';

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  groupForUpdate: IGroup | null;
}

export const GroupsDrawer: FC<IProps> = ({ visible, setVisible, groupForUpdate }) => {
  const [form] = useForm<IGroup>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    if (!groupForUpdate) {
      dispatch(addNewGroup(form.getFieldsValue()));
    } else {
      console.log('update');
    }
  };

  return (
    <Drawer
      visible={visible}
      onClose={handleClose}
      title={groupForUpdate ? 'Редактирование группы' : 'Создание группы'}
      footer={<DrawerFooter cancelCallback={handleClose} saveCallback={handleSubmit} />}
    >
      <Form name={'Group'} form={form} layout={'vertical'}>
        <Form.Item name={'name'} label={'Имя группы'} initialValue={groupForUpdate?.name}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
