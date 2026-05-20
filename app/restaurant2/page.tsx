import RestaurantDetail from '@/components/RestaurantDetail';

export default function Restaurant2Page() {
  const content = {
    restaurantName: 'Trick Rider',
    cuisine: 'Signature Steak and Seafood',
    description: `
      <p>Trick Rider pays a spirited tribute to the legendary female trick riders of the rodeo across the Lone Star State. This upscale steakhouse blends authentic rodeo culture with a sophisticated atmosphere, featuring a hand-cut crystal horse chandelier that serves as the room's crown jewel.</p>
      <p>Prepare for a dining experience defined by signature steaks, premium seafood, and a horse-shoe shaped bar that serves as the heart of Frisco's evening scene. Whether you are seeking a refined dinner or a vibrant night of cocktails, Trick Rider captures the essence of modern Texan luxury.</p>
    `,
    heroImage: {
      url: 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
      alt: 'Trick Rider dining room',
    },
    hours: 'Dinner: Tue – Sun, 5:00 PM – 10:00 PM\nBar: Tue – Sun, 4:00 PM – 12:00 AM',
    menuLink: {
      url: 'http://menus.omnihotels.com/htmlmenu/omnipgafriscoresort/trickrider',
      title: 'View Digital Menu',
    },
    reservationUrl: 'https://www.opentable.com/r/trick-rider-frisco',
    locationTags: ['Omni PGA Frisco Resort', 'Frisco, Texas'],
  };

  return <RestaurantDetail content={content} />;
}
