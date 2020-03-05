import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog/DialogFooter';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { FilterField } from './FilterField';
import { DialogType, IDialogContentProps } from 'office-ui-fabric-react/lib/components/Dialog';
import { IModalProps } from 'office-ui-fabric-react/lib/components/Modal';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Filters',
    closeButtonAriaLabel: 'Close',
};

const modalProps: IModalProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 500 } },
    dragOptions: undefined,
};

export interface IFiltersProps {
    columns: ColumnModel[];
    applyFilters: (columns: ColumnModel[]) => void;
    close: () => void;
}

export const FiltersDialog: React.FunctionComponent<IFiltersProps> = (props: IFiltersProps) => {
    const { columns, applyFilters, close } = props;
    const copyOfCoumns = columns.map(column => ({
        ...column,
        filter: {
            ...column.filter,
        },
    }));

    const [tempColumns] = React.useState(copyOfCoumns);

    const onClick = () => {
        applyFilters(tempColumns);
        close();
    };

    return (
        <Dialog
            hidden={false}
            onDismiss={() => close()}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            {tempColumns.map(column => {
                return <FilterField key={column.name} column={column} />;
            })}
            <DialogFooter>
                <PrimaryButton onClick={onClick} text="Apply" />
                <DefaultButton onClick={close} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};