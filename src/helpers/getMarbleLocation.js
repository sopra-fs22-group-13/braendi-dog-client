/**
 * Gets a marbles position in percentages based on where it should be
 * @param {('main_circle' | 'bl_goal' | 'ul_goal' | 'ur_goal' | 'br_goal' | 'bl_base' | 'ul_base' | 'ur_base' | 'br_base')} where - where should it be? b = bottom, u = upper, l = left, r = right
 * @param {int} idx - the index
 * @returns {{left: number, top: number}} - a dict with a .top and .left percentage
 */
export function getMarbleLocation(where, idx)
{
    // DATA
    let dataList = [
        {left: 34.73858833, top: 74.06699317},
        {left: 32.09903581, top: 72.23961013},
        {left: 29.82788597, top: 70.0772575},
        {left: 27.6282583, top: 67.67458745},
        {left: 25.69935492, top: 65.11963606},
        {left: 28.0728834, top: 62.95760955},
        {left: 30.37591151, top: 60.66633122},
        {left: 32.62666123, top: 58.42917987},
        {left: 34.89396913, top: 56.19571209},
        {left: 33.9633584, top: 53.13315392},
        {left: 33.69373935, top: 50.07948681},
        {left: 33.88260092, top: 46.8173374},
        {left: 34.89311252, top: 43.83280107},
        {left: 32.52676385, top: 41.54805115},
        {left: 30.25898593, top: 39.23327327},
        {left: 27.97475713, top: 36.94904532},
        {left: 25.89869159, top: 34.77618013},
        {left: 27.72975649, top: 32.16177225},
        {left: 29.83068228, top: 29.80704308},
        {left: 32.28411334, top: 27.57357529},
        {left: 34.80685779, top: 25.77161448},
        {left: 37.07528796, top: 28.19508144},
        {left: 39.36003787, top: 30.4308721},
        {left: 41.61214828, top: 32.69114324},
        {left: 43.90342619, top: 34.98242072},
        {left: 46.84096192, top: 34.10115923},
        {left: 49.94299965, top: 33.66640466},
        {left: 53.10085054, top: 33.99279799},
        {left: 56.13630414, top: 34.914858},
        {left: 58.39233143, top: 32.58833034},
        {left: 60.62948193, top: 30.37837914},
        {left: 62.89725985, top: 28.19285222},
        {left: 65.16738789, top: 25.92272418},
        {left: 67.77592046, top: 27.81214714},
        {left: 70.09398937, top: 29.84257255},
        {left: 72.32745716, top: 32.21140248},
        {left: 74.1548402, top: 34.73251377},
        {left: 71.85181209, top: 37.08254269},
        {left: 69.61928436, top: 39.33857083},
        {left: 67.44672912, top: 41.57203947},
        {left: 65.0711315, top: 43.78520335},
        {left: 65.88330099, top: 46.84776174},
        {left: 66.30630663, top: 49.8764798},
        {left: 66.03829009, top: 53.11703916},
        {left: 65.08805071, top: 56.18704259},
        {left: 67.29120357, top: 58.47832135},
        {left: 69.51393911, top: 60.66189068},
        {left: 71.74740689, top: 62.96303953},
        {left: 73.96818399, top: 65.27781827},
        {left: 72.08816154, top: 67.78059857},
        {left: 70.11022057, top: 70.14041969},
        {left: 67.61331558, top: 72.35336304},
        {left: 65.12604441, top: 74.14690597},
        {left: 62.77413539, top: 71.84575796},
        {left: 60.57450856, top: 69.62920938},
        {left: 58.27335971, top: 67.34498058},
        {left: 56.07373289, top: 65.04383257},
        {left: 53.13619737, top: 65.95446893},
        {left: 50.07136869, top: 66.26780544},
        {left: 46.77153719, top: 66.03280306},
        {left: 43.77280303, top: 65.05362477},
        {left: 41.5560518, top: 67.33837468},
        {left: 39.24519079, top: 69.55131803},
        {left: 37.01266391, top: 71.81322064},
        {left: 34.20895849, top: 69.2375149},
        {left: 33.86820384, top: 66.04147639},
        {left: 36.14773154, top: 63.7854491},
        {left: 38.38119933, top: 61.56890137},
        {left: 30.75768266, top: 34.2780573},
        {left: 33.96449259, top: 33.95166397},
        {left: 36.20028325, top: 36.22825486},
        {left: 38.46759115, top: 38.56324383},
        {left: 65.75027364, top: 30.78262806},
        {left: 66.09298672, top: 33.94537483},
        {left: 63.8252088, top: 36.21315275},
        {left: 61.52406079, top: 38.48046064},
        {left: 69.0816147, top: 65.71963344},
        {left: 65.99448238, top: 66.10722542},
        {left: 63.73693177, top: 63.8496748},
        {left: 61.43390366, top: 61.61714792},
        {left: 49.94180948, top: 74.02373552},
        {left: 46.77743103, top: 74.08493417},
        {left: 43.57551762, top: 74.0531104},
        {left: 40.374778, top: 74.0813102},
        {left: 25.82230909, top: 50.03191134},
        {left: 25.78314202, top: 46.82999722},
        {left: 25.79724278, top: 43.67155816},
        {left: 25.82160745, top: 40.45536433},
        {left: 49.94959565, top: 25.93211276},
        {left: 53.16374898, top: 25.9389128},
        {left: 56.37545458, top: 25.9389128},
        {left: 59.56209387, top: 25.9389128},
        {left: 73.9538329, top: 50.02923169},
        {left: 73.93424852, top: 53.21156212},
        {left: 73.94834927, top: 56.44050198},
        {left: 73.96865402, top: 59.6282695}
    ];

    if(where == "main_circle")
    {
        if(idx >= 0 && idx < 64)
        {
            return dataList[idx];
        }else
        {
            return null;
        }
    }
    if(where == "bl_goal")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 64];
        }else
        {
            return null;
        }
    }
    if(where == "tl_goal")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 68];
        }else
        {
            return null;
        }
    }
    if(where == "tr_goal")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 72];
        }else
        {
            return null;
        }
    }
    if(where == "br_goal")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 76];
        }else
        {
            return null;
        }
    }
    if(where == "bl_base")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 80]; //from the other side
        }else
        {
            return null;
        }
    }
    if(where == "tl_base")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 84];
        }else
        {
            return null;
        }
    }
    if(where == "tr_base")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 88];
        }else
        {
            return null;
        }
    }
    if(where == "br_base")
    {
        if(idx >= 0 && idx < 4)
        {
            return dataList[idx + 92];
        }else
        {
            return null;
        }
    }
    return null;
}