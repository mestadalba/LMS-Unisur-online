import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(data);
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  return { profile, loading };
}