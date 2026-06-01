export interface Utilisateur {
  id_utilisateur: number;
  email: string;
  nom: string;
  prenom: string;
  telephone?: string;
  id_role: number; // 1=admin, 2=artisan, 3=client
  date_inscription?: string;
  actif: number;
}

export interface Artisan {
  id_artisan: number;
  id_utilisateur: number;
  nom_boutique: string;
  description?: string;
  numero_tva?: string;
  iban?: string;
  commission?: number;
  valide: number; // 1=actif, 0=inactif/en attente
  date_validation?: string;
  logo?: string;
}

export interface Produit {
  id_produit: number;
  id_artisan: number;
  categorie?: string | null;
  nom: string;
  description?: string;
  prix_ht: number;
  taux_tva: number;
  stock: number;
  poids?: string;
  image_principale?: string;
  actif: number;
  mis_en_avant: number;
  nb_vues?: number;
  date_creation?: string;
}

export interface Commande {
  id_commande: number;
  reference: string;
  id_utilisateur: number;
  id_adresse: number;
  statut: StatutCommande;
  total_ht: number;
  total_tva: number;
  frais_livraison: number;
  total_ttc: number;
  date_commande: string;
  date_paiement?: string;
}

export type StatutCommande = 'en_attente' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';

export interface LigneCommande {
  id_ligne_commande: number;
  id_commande: number;
  id_produit: number;
  quantite: number;
  prix_unitaire_ht: number;
  taux_tva: number;
}

export interface Avis {
  id_avis: number;
  id_produit: number;
  id_utilisateur: number;
  note: number;
  commentaire?: string;
  statut: 'pending' | 'approved' | 'rejected';
  date_creation?: string;
}

export interface Adresse {
  id_adresse: number;
  rue: string;
  code_postal: string;
  id_ville?: number;
  id_pays?: number;
}

export interface Ville {
  id_ville: number;
  nom: string;
  id_pays: number;
}

export interface Pays {
  id_pays: number;
  nom: string;
  code?: string;
}

export interface CartLine {
  id_produit: number;
  quantite: number;
  produit: Produit;
}

export interface CartResponse {
  nb_lignes: number;
  lines: CartLine[];
}

export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export interface AdminStats {
  nb_utilisateurs: number;
  nb_artisans: number;
  nb_produits: number;
  nb_commandes: number;
  commandes: Commande[];
  produits: Produit[];
  artisans: Artisan[];
}

export interface ArtisanStats {
  artisan_id: number;
  nb_produits: number;
  ids_produits: number[];
  nb_commandes: number;
  commandes: Commande[];
}

export const STATUT_LABELS: Record<StatutCommande, string> = {
  en_attente:     'En attente',
  en_preparation: 'En préparation',
  expediee:       'Expédiée',
  livree:         'Livrée',
  annulee:        'Annulée',
};

export const STATUT_NEXT: Partial<Record<StatutCommande, StatutCommande>> = {
  en_attente:     'en_preparation',
  en_preparation: 'expediee',
  expediee:       'livree',
};

export interface Categorie {
  id_categorie: number;
  nom: string;
  description?: string;
  image?: string;
  ordre?: number;
  actif: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  miels:        'Miels',
  savons:       'Savons',
  confiseries:  'Confiseries',
  cosmetiques:  'Cosmétiques',
  bougies:      'Bougies',
  pollen:       'Pollen',
  propolis:     'Propolis',
  coffrets:     'Coffrets',
};
