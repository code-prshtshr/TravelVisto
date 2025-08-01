import Header from "../../../components/Header";
import StatsCard from "../../../components/StatsCard";
import TripCard from "../../../components/TripCard";
import React from "react";
import {
    user,
    users,
    allTrips,
    dashboardStats,
} from "../../../app/constants/index";

function Dashboard() {
    const { totalUser, userJoined, totalTrip, tripsCreated, userRole } =
        dashboardStats;

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? "Guest"}👏`}
                description="Track activity, trends and popular destinations in real time"
            />
            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUser}
                        currentMonthCount={userJoined.currentMonth}
                        lastMonthCount={userJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrip}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active User"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
                <section>
                    <div className="container">
                        <h1 className="text-xl font-semibold text-dark-100">
                            Created Trip
                        </h1>

                        <div className="trip-grid">
                            {allTrips
                                .slice(0, 4)
                                .map(
                                    ({
                                         id,
                                         name,
                                         imageUrls,
                                         itinerary,
                                         tags,
                                         travelStyle,
                                         estimatedPrice,
                                     }) => (
                                        <TripCard
                                            key={id}
                                            id={id?.toString()}
                                            name={name ?? ""}
                                            imageUrls={imageUrls?.[0] ?? ""}
                                            location={itinerary?.[0]?.location ?? ""}
                                            tags={tags ?? []}
                                            price={estimatedPrice ?? 0}
                                        />
                                    )
                                )}
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default Dashboard;
