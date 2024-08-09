import { Request, Response } from "express";
import Player, { iPlayer } from "../models/player";
import jwt from "jsonwebtoken";
import { config } from "../config";
import Team from "../models/team"; // Make sure this import is correct
import { ObjectId } from "mongoose";

// Register a new player
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { username, password, phoneNumber, photo, teamId } = req.body;

    // Create the player
    const player: iPlayer = await Player.create({
      username,
      password,
      phoneNumber,
      photo,
    });

    // If a teamId is provided, add the player to the team
    if (teamId) {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (!team.players.includes(player._id as ObjectId)) {
        team.players.push(player._id as ObjectId);
        await team.save();
      }
    }

    res.status(201).json({ message: "Player registered successfully", player });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Add additional player-team handling functions
export const addPlayerToTeam = async (req: Request, res: Response) => {
  try {
    const { teamId, playerId }: any = req.params;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    if (!team.players.includes(playerId)) {
      team.players.push(playerId);
      await team.save();
    }

    res.status(200).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removePlayerFromTeam = async (req: Request, res: Response) => {
  try {
    const { teamId, playerId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.players = team.players.filter(
      (id: ObjectId) => id.toString() !== playerId
    );
    await team.save();

    res.status(200).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Login player
export const loginPlayer = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ username });

    if (!player) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // const isMatch = await player.comparePassword(password);

    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid username or password" });
    // }

    // Generate JWT
    const token = jwt.sign({ id: player._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all players
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get a player by ID
export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json(player);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a player
export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { username, password, phoneNumber, photo, club } = req.body;
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    if (username) player.username = username;
    // if (password) player.password = password; // Password should be hashed in pre-save hook
    if (phoneNumber) player.phoneNumber = phoneNumber;
    if (photo) player.photo = photo;
    if (club) player.club = club;

    await player.save();
    res.status(200).json({ message: "Player updated successfully", player });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a player
export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
