import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function createDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <TableRow role="row" key={cabinId}>
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
      <div className="flex justify-between">
        {/* duplicate button */}
        <Button onClick={() => createDuplicate()} disabled={isCreating}>
          <HiSquare2Stack />
        </Button>

        {/* edit button and Modal */}
        <Modal>
          <Modal.Open opens="cabin-edit">
            <Button $size="small">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="cabin-edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          {/* delete button and Modal*/}
          <Modal.Open opens="cabin-delete">
            <Button $variation="danger" $size="small" disabled={isDeleting}>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="cabin-delete">
            <ConfirmDelete
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
              resourceName={`Cabin ${name}`}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;
