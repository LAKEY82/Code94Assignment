import { CloseCircle } from 'iconsax-react';


interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-[600px]"> {/* Adjusted width */}
                {/* Close Icon Positioned at the Top-Right Corner */}
                <CloseCircle
                    size="28"
                    color="#555555"
                    onClick={onCancel}
                    className="absolute top-4 pt-2 right-4 cursor-pointer"
                />
                <h2 className="text-lg font-semibold text-start w-full mb-4">
                    Are you sure you want to delete the selected task?
                </h2>
                <p className="mb-4 text-start text-sm text-gray-700">{message}</p> {/* Longer message text */}
                
                <div className="flex justify-end space-x-2 pr-[40px]">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">Yes, delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
