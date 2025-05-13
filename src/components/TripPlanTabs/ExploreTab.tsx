import Explore from '@/app/explore';

export default function ExploreTab({
    trip,
    openSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    trip: any;
    openSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) {
    return (
        <Explore
            locationId={trip.locationId}
            tripId={trip.id}
            openSheet={openSheet}
            setBottomSheetContent={setBottomSheetContent}
            setSnapPoints={setSnapPoints}
        />
    );
}
