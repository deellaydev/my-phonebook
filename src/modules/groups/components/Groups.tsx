import React, { Fragment, useEffect, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';
import { GroupsDrawer } from './GroupsDrawer';
import { IGroup } from '../../customers/dto/Customers';
import { deleteGroup, getAllGroups } from '../groupsAsyncActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { generateGroupsColumns } from '../helpers/generateGroupsColumns';
import { Modal, Table, Typography } from 'antd';
import styled from 'styled-components';
import { getGroupsEntities } from '../groupsSelectors';

document.cookie = 'x1=x2';

export const Groups = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [groupForUpdate, setGroupForUpdate] = useState<IGroup | null>(null);

  const allGroups = useAppSelector(getGroupsEntities);

  const dispatch = useAppDispatch();

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить группу?',
      maskClosable: true,
      content: <Typography.Text>Группа будет удалена навсегда</Typography.Text>,
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk: () => dispatch(deleteGroup(id)),
    });
  };

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const columns = generateGroupsColumns({ showDeleteModal });

  return (
    <Fragment>
      <ComponentHeader title={'Группы'} callback={() => setVisibleDrawer(true)} />
      <GroupsDrawer visible={visibleDrawer} setVisible={setVisibleDrawer} groupForUpdate={groupForUpdate} />
      <TableWrapper>
        <Table columns={columns} dataSource={allGroups} />
      </TableWrapper>
    </Fragment>
  );
};

const TableWrapper = styled.div`
  padding: 50px;
`;
