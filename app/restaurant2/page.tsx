import { ContentProps } from '@optimizely/cms-sdk';
import { withAppContext, OptimizelyComponent } from '@optimizely/cms-sdk/react/server';
import RestaurantDetail from '@/components/RestaurantDetail';
import { fetchRestaurant } from '@/lib/cms';
import { RestaurantEntity } from '@/cms/content-types/RestaurantEntity';

async function Restaurant2PageContent() {
  const cmsData = await fetchRestaurant();

  if (!cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Content Available</h1>
          <p className="text-gray-400">Restaurant content could not be loaded from the CMS.</p>
        </div>
      </div>
    );
  }

  return <RestaurantDetail content={cmsData as unknown as ContentProps<typeof RestaurantEntity>} />;
}

export default withAppContext(Restaurant2PageContent);
