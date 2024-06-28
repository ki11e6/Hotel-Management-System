import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
// import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { createCabin, isCreating } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      {/* image column */}
      <Img src={image} />

      {/* cabin name column */}
      <Cabin>{name}</Cabin>

      {/* capacity column */}
      <div>Fits up to {maxCapacity} guests</div>

      {/* price column */}
      <Price>{formatCurrency(regularPrice)}</Price>

      {/* discount column */}
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      {/* buttons column */}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              {/* duplicate button */}
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              {/* edit button and Modal */}
              <Modal.Open opens="cabin-edit">
                <Menus.Button icon={<HiPencil />} disabled={isCreating}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              {/* delete button and Modal*/}
              <Modal.Open opens="cabin-delete">
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="cabin-edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="cabin-delete">
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
                resourceName={`Cabin ${name}`}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
