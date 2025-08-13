import React from "react";
import TicketCard from "./(components)/TicketCard";

import Link from "next/link";

const getTickets = async () => {
  try {
    // const res = await fetch("http://localhost:3000/api/Tickets", {
    const res = await fetch("https://ktltcqa.vercel.app/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Page() {
  const data = await getTickets();

  // Make sure we have tickets needed for production build.
  if (!data?.tickets) {
    return <p>No tickets.</p>;
  }

  const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <>
      <div className="p-5">
        <div>
          <div className="text-xl font-bold">
            Q & A และช่องทางรับฟังความคิดเห็นวิทยาลัยเทคนิคกันทรลักษ์
          </div>
          <div className="">วิทยาลัยเทคนิคกันทรลักษ์</div>
          {tickets &&
            uniqueCategories.map((uniqueCategory, categoryIndex) => (
              <div
                key={categoryIndex}
                className="flex flex-col hover:bg-card-hover bg-card rounded-2xl shadow-lg p-3 m-2"
              >
                {/* <hr /> */}
                <div className="grid grid-cols-2">
                  <div className="flex justify-start">
                    <img src="avatar.webp" alt="avatar" className="p-2 w-14" />
                    <div className="pt-4">{uniqueCategory}</div>
                  </div>
                </div>
                <div className=" ">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCategory)
                    .map((filteredTicket, index) => (
                      <TicketCard
                        id={filteredTicket.id}
                        key={filteredTicket.id}
                        ticket={filteredTicket}
                      />
                    ))}
                </div>
              </div>
            ))}

          {/* {tickets &&
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, index) => (
                    <TicketCard
                      id={filteredTicket.id}
                      key={filteredTicket.id}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))} */}
        </div>
      </div>

      <Link href="/TicketPage/new">
        <div className="flex px-12">
          <div className="flex gap-2">
            <p className="text-2xl rounded-full border px-3 pb-1 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600">
              +
            </p>
            <p className="hover:text-gray-500 pt-2"> Add Comments</p>
          </div>
        </div>
      </Link>
    </>
  );
}
