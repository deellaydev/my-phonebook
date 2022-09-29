import React, { FC, useEffect } from 'react';
import { Button, Collapse, DatePicker, Divider, Drawer, Form, InputNumber, Select } from 'antd';
import { ICustomer } from '../dto/Customers';
import { useForm } from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { DrawerFooter } from '../../../common/components/DrawerFooter';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { groupAdapter } from '../../groups/groupSlice';
import { typeGlobalState } from '../../../store/store';
import { getAllGroups } from '../../groups/groupsAsyncActions';

const { Panel } = Collapse;

const genderOptions = [
  {
    label: 'Неопределённый',
    value: 'None',
  },
  {
    label: 'Мужской',
    value: 'Male',
  },
  {
    label: 'Женский',
    value: 'Female',
  },
];

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  customerForUpdate: ICustomer | null;
}

export const CustomersDrawer: FC<IProps> = ({ visible, setVisible, customerForUpdate }) => {
  const allGroups = useAppSelector(groupAdapter.getSelectors((state: typeGlobalState) => state.GroupReducer).selectAll);

  const [form] = useForm();
  const dispatch = useAppDispatch();

  const groupsOptions = allGroups.map((group) => {
    return { label: group.name, value: group.id };
  });

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => console.log(values));
  };

  return (
    <Drawer
      open={visible}
      onClose={handleClose}
      title={customerForUpdate ? 'Редактирование абонента' : 'Создание абонента'}
      footer={<DrawerFooter cancelCallback={handleClose} saveCallback={handleSubmit} />}
    >
      <Form form={form} layout={'vertical'} name={'customer'}>
        <Form.Item name={'firstName'} label={'Имя'}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'secondName'} label={'Фамилия'}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'middleName'} label={'Отчество'}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'groups'} label={'Группы'}>
          <Select mode={'multiple'} options={groupsOptions} />
        </Form.Item>
        <Form.List name='phoneNumbers'>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Collapse key={index}>
                    <PanelStyled key={index} header={'Номера абонента'} extra={<DeleteOutlinedStyled onClick={() => remove(field.name)} />}>
                      <Form.Item {...field} name={[field.name, 'phoneNumber']} label={'Номер телефона'}>
                        <Input showCount />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'phoneCategoryId']} label={'Категория'}>
                        <Select options={[{ label: 'test', value: 'asd' }]} />
                      </Form.Item>
                      <Divider />
                    </PanelStyled>
                  </Collapse>
                ))}
                <Form.Item>
                  <ButtonStyled type={'dashed'} onClick={() => add()} icon={<PlusOutlined />}>
                    Добавить номер
                  </ButtonStyled>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item name={['address', 'region']} label={'Регион'}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'city']} label={'Город'}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'street']} label={'Улица'}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'block']} label={'Квартал'}>
          <Input />
        </Form.Item>
        <ItemsWrapper>
          <Form.Item name={['address', 'house']} label={'Дом'}>
            <StyledInputNumber min={0} />
          </Form.Item>
          <Form.Item name={['address', 'flat']} label={'Подъезд'}>
            <StyledInputNumber min={0} />
          </Form.Item>
        </ItemsWrapper>
        <Form.Item name={'gender'} label={'Пол'}>
          <Select options={genderOptions} />
        </Form.Item>
        <LabelStyled>Дата рождения</LabelStyled>
        <DatePickerStyled locale={locale} />
        <Form.Item name={'email'} label={'Почта'}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const DeleteOutlinedStyled = styled(DeleteOutlined)`
  color: red;
  font-size: 16px;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
`;
const PanelStyled = styled(Panel)`
  margin-bottom: 15px;
`;
const LabelStyled = styled.p`
  margin-bottom: 10px;
`;
const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  margin-bottom: 10px;
`;
const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;
