import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

const AddCabin = () => {
  //implimenting compound component
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button type="button">Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
