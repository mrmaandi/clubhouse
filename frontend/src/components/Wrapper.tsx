import React, { createContext, ReactNode, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import { RootStore } from '../store/RootStore';
import AudioPlayer from './AudioPlayer';
import NextEvent from './NextEvent';
import PreviousEvents from './PreviousEvents';
import { observer } from 'mobx-react';
import DropzoneDialogModal from './DialogComponent';
import AddEventModal from './AddEventModal';

let rootStore: RootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

const RootStoreProvider = ({ children }: { children: ReactNode }) => {
    const root = rootStore ?? new RootStore();
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export const useRootStore = (): RootStore => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
};

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <RootStoreProvider>
                <Header />
                <NextEvent />
                <PreviousEvents />
                <Footer />
                <AudioPlayer />
                <AddEventModal />
            </RootStoreProvider>
        );
    }
}

export default observer(Wrapper);
