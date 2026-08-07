import { useQuery } from '@tanstack/react-query';

import { getApi } from '@/services/api.service';

export function useApi() {
  return useQuery({
    queryKey: ['api'],

    queryFn: getApi,
  });
}
