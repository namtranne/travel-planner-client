import Explore from '@/app/explore';

export default function ExploreTab({ trip }: any) {
    return <Explore locationId={trip.locationId} tripId={trip.id} />;
}
