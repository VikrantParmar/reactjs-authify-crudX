import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import FormManager from "@/components/Category/FormManager";
import { PopupTransition } from "@/components/@extended/Transitions";
export default function FormModal({ open, onClose, recordData, onSuccess }) {
  const loading = false;
  const closeModal = () => onClose(false);
  const RecordForm = useMemo(
    () =>
      !loading && (
        <FormManager
          recordData={recordData || null}
          closeModal={closeModal}
          onSuccess={onSuccess}
        />
      ),
    [recordData, loading, onSuccess]
  );

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      keepMounted
      TransitionComponent={PopupTransition}
    >
      {RecordForm}
    </Dialog>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  recordData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  onSuccess: PropTypes.func,
};
