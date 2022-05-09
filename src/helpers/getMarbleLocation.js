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
        {left: 34.73858833, top: 82.08932422},
        {left: 32.09903581, top: 79.6528135},
        {left: 29.82788597, top: 76.76967666},
        {left: 27.6282583, top: 73.56611661},
        {left: 25.69935492, top: 70.15951475},
        {left: 28.0728834, top: 67.27681274},
        {left: 30.37591151, top: 64.22177496},
        {left: 32.62666123, top: 61.2389065},
        {left: 34.89396913, top: 58.26094945},
        {left: 33.9633584, top: 54.17753855},
        {left: 33.69373935, top: 50.10598242},
        {left: 33.88260092, top: 45.75644987},
        {left: 34.89311252, top: 41.77706809},
        {left: 32.52676385, top: 38.73073487},
        {left: 30.25898593, top: 35.64436436},
        {left: 27.97475713, top: 32.59872709},
        {left: 25.89869159, top: 29.70157351},
        {left: 27.72975649, top: 26.21569633},
        {left: 29.83068228, top: 23.07605743},
        {left: 32.28411334, top: 20.09810039},
        {left: 34.80685779, top: 17.69548598},
        {left: 37.07528796, top: 20.92677525},
        {left: 39.36003787, top: 23.90782947},
        {left: 41.61214828, top: 26.92152432},
        {left: 43.90342619, top: 29.97656096},
        {left: 46.84096192, top: 28.80154564},
        {left: 49.94299965, top: 28.22187287},
        {left: 53.10085054, top: 28.65706398},
        {left: 56.13630414, top: 29.88647733},
        {left: 58.39233143, top: 26.78444045},
        {left: 60.62948193, top: 23.83783885},
        {left: 62.89725985, top: 20.92380297},
        {left: 65.16738789, top: 17.89696557},
        {left: 67.77592046, top: 20.41619619},
        {left: 70.09398937, top: 23.12343007},
        {left: 72.32745716, top: 26.28186998},
        {left: 74.1548402, top: 29.64335169},
        {left: 71.85181209, top: 32.77672359},
        {left: 69.61928436, top: 35.78476111},
        {left: 67.44672912, top: 38.76271929},
        {left: 65.0711315, top: 41.71360447},
        {left: 65.88330099, top: 45.79701566},
        {left: 66.30630663, top: 49.83530641},
        {left: 66.03829009, top: 54.15605221},
        {left: 65.08805071, top: 58.24939013},
        {left: 67.29120357, top: 61.30442846},
        {left: 69.51393911, top: 64.21585424},
        {left: 71.74740689, top: 67.28405271},
        {left: 73.96818399, top: 70.37042436},
        {left: 72.08816154, top: 73.70746476},
        {left: 70.11022057, top: 76.85389292},
        {left: 67.61331558, top: 79.80448405},
        {left: 65.12604441, top: 82.19587462},
        {left: 62.77413539, top: 79.12767728},
        {left: 60.57450856, top: 76.17227918},
        {left: 58.27335971, top: 73.12664077},
        {left: 56.07373289, top: 70.05844343},
        {left: 53.13619737, top: 71.27262524},
        {left: 50.07136869, top: 71.69040725},
        {left: 46.77153719, top: 71.37707074},
        {left: 43.77280303, top: 70.07149969},
        {left: 41.5560518, top: 73.11783291},
        {left: 39.24519079, top: 76.06842404},
        {left: 37.01266391, top: 79.08429418},
        {left: 34.20895849, top: 75.65001987},
        {left: 33.86820384, top: 71.38863518},
        {left: 36.14773154, top: 68.38059879},
        {left: 38.38119933, top: 65.42520182},
        {left: 30.75768266, top: 29.03740974},
        {left: 33.96449259, top: 28.60221863},
        {left: 36.20028325, top: 31.63767315},
        {left: 38.46759115, top: 34.75099178},
        {left: 65.75027364, top: 24.37683741},
        {left: 66.09298672, top: 28.59383311},
        {left: 63.8252088, top: 31.617537},
        {left: 61.52406079, top: 34.64061419},
        {left: 69.0816147, top: 70.95951126},
        {left: 65.99448238, top: 71.47630056},
        {left: 63.73693177, top: 68.46623307},
        {left: 61.43390366, top: 65.48953056},
        {left: 49.94180948, top: 82.03164736},
        {left: 46.77743103, top: 82.11324556},
        {left: 43.57551762, top: 82.07081386},
        {left: 40.374778, top: 82.10841361},
        {left: 25.82230909, top: 50.04254846},
        {left: 25.78314202, top: 45.77332962},
        {left: 25.79724278, top: 41.56207754},
        {left: 25.82160745, top: 37.27381911},
        {left: 49.94959565, top: 17.90948368},
        {left: 53.16374898, top: 17.9185504},
        {left: 56.37545458, top: 17.9185504},
        {left: 59.56209387, top: 17.9185504},
        {left: 73.9538329, top: 50.03897558},
        {left: 73.93424852, top: 54.28208283},
        {left: 73.94834927, top: 58.58733597},
        {left: 73.96865402, top: 62.83769267}
    ];

    if(where == "main_circle")
    {
        if(idx >= 0 && idx < 64)
        {
            return dataList[(64 - idx) % 64];
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