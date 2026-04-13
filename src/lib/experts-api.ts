import { supabase, useMockData } from "./supabase";
import { mockExperts } from "./mock-data";
import { Expert } from "@/types/expert";

let localExperts: Expert[] = [...mockExperts];

export async function getExperts(filters?: { trade?: string; location?: string }): Promise<Expert[]> {
  if (useMockData) {
    let r = [...localExperts];
    if (filters?.trade) r = r.filter(e => e.trade === filters.trade);
    if (filters?.location) r = r.filter(e => e.location === filters.location);
    return r.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  let q = supabase.from("experts").select("*").order("created_at", { ascending: false });
  if (filters?.trade) q = q.eq("trade", filters.trade);
  if (filters?.location) q = q.eq("location", filters.location);
  const { data, error } = await q;
  if (error) throw error;
  return data as Expert[];
}

export async function getExpertStats() {
  if (useMockData) {
    return {
      total: localExperts.length,
      newLeads: localExperts.filter(e => e.status === "新线索" || e.status === "New").length,
      invited: localExperts.filter(e => e.status === "已邀请" || e.status === "Invited").length,
      registered: localExperts.filter(e => e.status === "已注册" || e.status === "Registered").length,
    };
  }
  const { count: total } = await supabase.from("experts").select("*", { count:"exact", head:true });
  const { count: invited } = await supabase.from("experts").select("*", { count:"exact", head:true }).eq("status","已邀请");
  const { count: registered } = await supabase.from("experts").select("*", { count:"exact", head:true }).eq("status","已注册");
  const { count: newLeads } = await supabase.from("experts").select("*", { count:"exact", head:true }).eq("status","新线索");
  return { total: total||0, invited: invited||0, registered: registered||0, newLeads: newLeads||0 };
}

export async function addExpert(expert: Omit<Expert, "id"|"created_at">): Promise<Expert> {
  if (useMockData) {
    const ne: Expert = { ...expert, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    localExperts.unshift(ne);
    return ne;
  }
  const { data, error } = await supabase.from("experts").insert(expert).select().single();
  if (error) throw error;
  return data as Expert;
}

export async function updateExpert(id: string, fields: Partial<Expert>): Promise<Expert> {
  if (useMockData) {
    const idx = localExperts.findIndex(e => e.id === id);
    if (idx === -1) throw new Error("Not found");
    localExperts[idx] = { ...localExperts[idx], ...fields };
    return localExperts[idx];
  }
  const { data, error } = await supabase.from("experts").update(fields).eq("id", id).select().single();
  if (error) throw error;
  return data as Expert;
}

export async function deleteExpert(id: string): Promise<void> {
  if (useMockData) { localExperts = localExperts.filter(e => e.id !== id); return; }
  const { error } = await supabase.from("experts").delete().eq("id", id);
  if (error) throw error;
}
